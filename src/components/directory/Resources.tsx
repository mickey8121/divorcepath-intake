/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-has-content */
import { FC, useMemo } from 'react';

import PortableText from 'react-portable-text';

import useAllProvinces from 'hooks/interview/useAllProvinces';

import { Sanity_Resource } from 'generated/sanity_graphql';

const Resources: FC = () => {
  const { city, province } = useAllProvinces();

  const currentPlace = useMemo(() => {
    if (city?.article) return city;
    if (province?.article) return province;

    return { name: province?.name };
  }, [city, province]);

  if (!currentPlace?.article) return null;

  return (
    <div className="resources-container">
      {currentPlace?.article?.bodyRaw && (
        <div className="article" id="article">
          <PortableText
            content={currentPlace?.article?.bodyRaw}
            serializers={{
              link: (props: any) => <a target="_blank" rel="noopener noreferrer" {...props} />
            }}
          />
        </div>
      )}
      {currentPlace?.article?.resources?.length && (
        <div className="resources" id="resources">
          <h2 className="resources-title">{currentPlace?.name} Family Law Resources</h2>
          <div className="links">
            {currentPlace?.article.resources.map(resource => (
              <div className="link" key={resource?.title}>
                <a
                  href={(resource as Sanity_Resource).link as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource?.title}
                </a>
                <span className="description">{resource?.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
