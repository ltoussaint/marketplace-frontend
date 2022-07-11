const config = {
  STARKNET_NETWORK: import.meta.env.DEATHNOTE_STARKNET_NETWORK,
  STARKNET_HOSTNAME: import.meta.env.DEATHNOTE_STARKNET_HOSTNAME,
  GITHUB_CLIENT_ID: import.meta.env.DEATHNOTE_GITHUB_CLIENT_ID,
  GITHUB_REDIRECT_URI: import.meta.env.DEATHNOTE_GITHUB_REDIRECT_URI,
  DATA_API_HOSTNAME: import.meta.env.DEATHNOTE_DATA_API_HOSTNAME,
  SIGNUP_API_HOSTNAME: import.meta.env.DEATHNOTE_SIGNUP_API_HOSTNAME,
  REGISTRY_CONTRACT_ADDRESS: import.meta.env.DEATHNOTE_REGISTRY_CONTRACT_ADDRESS,
};

export default config;
