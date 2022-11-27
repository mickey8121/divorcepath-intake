/* eslint-disable camelcase */
import { createContext, useContext } from 'react';

import { Maybe } from 'generated/graphql';
import { Sanity_City, Sanity_Province } from 'generated/sanity_graphql';

export interface AllProvincesOptions {
  allProvinces?: Maybe<Sanity_Province[]>;
  city?: Maybe<Sanity_City>;
  province?: Maybe<Sanity_Province>;
}

const initialValue: AllProvincesOptions = {
  allProvinces: null
};

export const AllProvincesContext = createContext<AllProvincesOptions>(initialValue);

const useAllProvinces = (): AllProvincesOptions => useContext(AllProvincesContext);

export default useAllProvinces;
