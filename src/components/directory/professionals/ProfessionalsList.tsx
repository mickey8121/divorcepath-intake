import { FC } from 'react';

import { Button } from 'reactstrap';
import Image from 'next/image';

import Loading from 'components/common/Loading';

import ProfessionalItem from 'components/directory/professionals/ProfessionalItem';

import { DirectoryPageEntitiesResponse, Maybe } from 'generated/graphql';

interface Props {
  professionals?: Maybe<DirectoryPageEntitiesResponse>;
  fetchMore: () => Promise<void>;
  loading?: boolean;
  fetchLoading?: boolean;
}

const ProfessionalsList: FC<Props> = ({ professionals, fetchMore, loading, fetchLoading }) => {
  if (!professionals?.count && !loading) {
    return (
      <div className="no-entities">
        <Image src="/intake/images/directory/no-entities.svg" width={207} height={180} />
        <h3 className="title">Are you a family law professional?</h3>
        <p className="subtitle">Get featured here. Join Divorcepath</p>
        <Button color="primary" className="sign-up">
          Sign Up
        </Button>
      </div>
    );
  }

  if (loading) return <Loading />;

  return (
    <div className="professionals-list-container">
      <div className="professionals-list">
        {professionals?.nodes?.map(professional => (
          <ProfessionalItem key={professional?.id} entity={professional} />
        ))}
      </div>
      {professionals?.hasNextPage && (
        <div className="show-more">
          {fetchLoading ? (
            <Loading />
          ) : (
            <Button className="show-more-btn" onClick={fetchMore as any}>
              Show More
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfessionalsList;
