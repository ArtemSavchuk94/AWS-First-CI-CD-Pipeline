import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { DashboardsStack} from './my-pipeline-project-stack';

export class MyPipelineAppStage extends cdk.Stage {
    
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
  
      const projectStack = new DashboardsStack(this, 'ProjectStack');      
    }
}