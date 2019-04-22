export const awsConfig = {
  Analytics: {
      disabled: true,
  },
  Auth: {
      mandatorySignIn: true,
      appId: 'f7b632ec589c438187210a17f3e93482',
      identityPoolId: 'us-east-1:7f8a0a03-9f88-4bc9-a0e9-ebbd2623a726',
      region: 'us-east-1',
      userPoolId: 'us-east-1_y8cGdXRwr',
      userPoolWebClientId: '4qdvmhcia6a4siku3b29s0md64',
  },
  API: {
      endpoints: [{
          name: 'stream',
          region: 'us-east-1',
          endpoint: 'https://y1amaf8p8j.execute-api.us-east-1.amazonaws.com/dev',
      }],
  },
};
