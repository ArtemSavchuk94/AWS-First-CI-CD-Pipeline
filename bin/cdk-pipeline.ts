#!/usr/bin/env node
//import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelineStack } from '../lib/cdk-pipeline-stack';

const app = new cdk.App();
new CdkPipelineStack(app, 'CdkPipelineStack', {
  stackName: 'first-pipeline',
  env: { account: '181481668787', region: 'eu-west-1' },
  //githubBranch: 'main',
  //zoneAttrs: {
    //zoneName: 'as94.pretty-solution.com', hostedZoneId: 'Z0336998L8QXS5PKF9H0'
  //}

}); 
app.synth();