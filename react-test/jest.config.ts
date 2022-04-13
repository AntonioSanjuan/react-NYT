import type {Config} from '@jest/types';

const config = async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    collectCoverage: true
  };
};

export default config;