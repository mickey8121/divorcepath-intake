import { FC, useCallback, useState } from 'react';

import { Col, Container, Row } from 'reactstrap';
import { uniqBy } from 'lodash';

import InfoSidebar from 'components/directory/InfoSidebar';
import PlacesSidebar from 'components/directory/PlacesSidebar';
import ProfessionalsList from 'components/directory/professionals/ProfessionalsList';
import Search from 'components/directory/Search';
import Resources from 'components/directory/Resources';

import useAllProvinces from 'hooks/interview/useAllProvinces';

import {
  DirectoryPageEntitiesQuery,
  DirectoryPageEntitiesResponse,
  DirectoryPageEntity,
  Maybe,
  OrganizationLocationResidence,
  useDirectoryPageEntitiesQuery
} from 'generated/graphql';

const DirectoryPage: FC = () => {
  const { province, city } = useAllProvinces();

  const [fetchLoading, setFetchLoading] = useState(false);

  const { data, fetchMore, networkStatus } = useDirectoryPageEntitiesQuery({
    variables: {
      where: { province: province?.shorthand as OrganizationLocationResidence, city: city?.name },
      skip: 0,
      take: 5
    }
  });

  const fetchMoreEntities = useCallback(async () => {
    setFetchLoading(true);

    try {
      await fetchMore({
        variables: {
          where: {
            province: province?.shorthand as OrganizationLocationResidence,
            city: city?.name
          },
          skip: data?.directoryPageEntities?.nodes?.length,
          take: 5
        },
        updateQuery: (prev, { fetchMoreResult }): DirectoryPageEntitiesQuery => {
          if (!fetchMoreResult) return prev;

          return {
            directoryPageEntities: {
              count: prev.directoryPageEntities?.count as number,
              hasNextPage: fetchMoreResult.directoryPageEntities?.hasNextPage as boolean,
              nodes: uniqBy(
                [
                  ...(prev.directoryPageEntities?.nodes || []),
                  ...(fetchMoreResult.directoryPageEntities?.nodes || [])
                ],
                'id'
              ) as DirectoryPageEntity[]
            }
          };
        }
      });
    } catch {
    } finally {
      setFetchLoading(false);
    }
  }, [city?.name, fetchMore, province?.shorthand, data?.directoryPageEntities?.nodes?.length]);

  return (
    <div className="directory-page">
      <Container>
        <Row>
          <Col lg={{ size: 7, offset: 2 }}>
            <Search />
          </Col>
        </Row>
      </Container>
      <div className="directory-page-content">
        <PlacesSidebar />
        <Col lg={7} md={5} className="main-content">
          <ProfessionalsList
            professionals={data?.directoryPageEntities as Maybe<DirectoryPageEntitiesResponse>}
            loading={[1, 2].includes(networkStatus)}
            fetchMore={fetchMoreEntities}
            fetchLoading={fetchLoading}
          />
          <Resources />
        </Col>
        <InfoSidebar />
      </div>
    </div>
  );
};

export default DirectoryPage;
