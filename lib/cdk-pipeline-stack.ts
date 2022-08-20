import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Stack, StackProps} from 'aws-cdk-lib';
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import {GitHubTrigger} from "aws-cdk-lib/aws-codepipeline-actions";
import {HostedZoneAttributes} from "aws-cdk-lib/aws-route53";
import { MyPipelineAppStage } from './my-pipeline-app-stage';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
//interface CdkPipelineStack extends StackProps {
  //zoneAttrs: HostedZoneAttributes,
  //githubBranch: string,
  //isProduction?: boolean
//}

export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'pipeline', {
      pipelineName: 'first-pipeline',
      crossAccountKeys: false,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('ArtemSavchuk94/AWS-First-CI-CD-Pipeline','main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
        //additionalInputs: {
          //'../AWS-First-CI-CD-Pipeline': CodePipelineSource.gitHub('ArtemSavchuk94/AWS-First-CI-CD-Pipeline', 'main', {
            //trigger: GitHubTrigger.WEBHOOK
          //})
       // }
      })
    })
   const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "181481668787", region: "eu-west-1" }
    }));
    testingStage.addPost(new ManualApprovalStep('approval'));
  }
}
