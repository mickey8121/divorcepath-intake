/* eslint-disable indent */
import { ApolloLink, HttpLink, NextLink, Operation, RequestHandler } from '@apollo/client';
import { hasDirectives, removeDirectivesFromDocument } from '@apollo/client/utilities';

import { OperationDefinitionNode, StringValueNode } from 'graphql';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API!;
const SANITY_API_URL = process.env.NEXT_PUBLIC_SANITY_API!;

class MultiAPILink extends ApolloLink {
  httpLink: ApolloLink;

  constructor(request?: RequestHandler) {
    super(request);
    this.httpLink = new HttpLink({ credentials: 'same-origin' });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public request(operation: Operation, forward: NextLink) {
    if (!hasDirectives(['api'], operation.query)) {
      return forward?.(operation);
    }

    const apiName: string = (
      (
        operation.query.definitions.find(
          definition => definition.kind === 'OperationDefinition'
        ) as OperationDefinitionNode
      )?.directives
        ?.find(directive => directive.name?.value === 'api')
        ?.arguments?.find(argument => argument.name?.value === 'name')?.value as StringValueNode
    )?.value;

    const query = removeDirectivesFromDocument([{ name: 'api', remove: true }], operation.query);
    if (!query) {
      throw new Error('Error while removing directive api');
    }

    // eslint-disable-next-line no-param-reassign
    operation.query = query;

    switch (apiName) {
      case 'default':
        operation.setContext({
          uri: API_URL
        });
        break;
      case 'sanity':
        operation.setContext({
          uri: SANITY_API_URL
        });
        break;
      default:
        return null;
    }

    return this.httpLink.request(operation, forward);
  }
}

export default MultiAPILink;
