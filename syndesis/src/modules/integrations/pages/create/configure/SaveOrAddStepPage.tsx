import { WithIntegrationHelpers } from '@syndesis/api';
import { Integration } from '@syndesis/models';
import { IntegrationEditorLayout } from '@syndesis/ui';
import { WithRouteData } from '@syndesis/utils';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { WithClosedNavigation } from '../../../../../containers';
import { PageTitle } from '../../../../../containers/PageTitle';
import {
  IntegrationCreatorBreadcrumbs,
  IntegrationEditorStepAdder,
} from '../../../components';
import resolvers from '../../../resolvers';
import {
  getConfigureConnectionHrefCallback,
  getConfigureStepHrefCallback,
  getCreateAddConnectionHref,
  getCreateAddStepHref,
} from '../../resolversHelpers';

export interface ISaveOrAddStepPageState {
  forceSidebarTooltips: boolean;
}

export interface ISaveOrAddStepRouteState {
  integration: Integration;
}

export class SaveOrAddStepPage extends React.Component<
  any,
  ISaveOrAddStepPageState
> {
  public state = {
    forceSidebarTooltips: false,
  };

  constructor(props: any) {
    super(props);
    this.onAddStep = this.onAddStep.bind(this);
    this.onAddConnection = this.onAddConnection.bind(this);
    this.hideSidebarTooltips = this.hideSidebarTooltips.bind(this);
  }

  public onAddStep(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    this.setState({
      forceSidebarTooltips: true,
    });
  }

  public onAddConnection(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    this.setState({
      forceSidebarTooltips: true,
    });
  }

  public hideSidebarTooltips() {
    this.setState({
      forceSidebarTooltips: false,
    });
  }

  public render() {
    return (
      <WithClosedNavigation>
        <WithRouteData<null, ISaveOrAddStepRouteState>>
          {(_, { integration }) => (
            <IntegrationEditorLayout
              onClick={this.hideSidebarTooltips}
              header={
                <IntegrationCreatorBreadcrumbs
                  step={3}
                  startConnection={integration.flows![0].steps![0].connection}
                  startAction={integration.flows![0].steps![0].action}
                  finishActionId={
                    integration.flows![0].steps![
                      integration.flows![0].steps!.length - 1
                    ].action!.id!
                  }
                  finishConnection={
                    integration.flows![0].steps![
                      integration.flows![0].steps!.length - 1
                    ].connection
                  }
                  integration={integration}
                />
              }
              content={
                <>
                  <PageTitle title={'Save or add step'} />
                  <div className={'container-fluid'}>
                    <h1>Add to Integration</h1>
                    <p>
                      You can continue adding steps and connections to your
                      integration as well. Once finished you can save the
                      integration, or save and publish it.
                    </p>
                    <WithIntegrationHelpers>
                      {({ getSteps }) => (
                        <IntegrationEditorStepAdder
                          steps={getSteps(integration, 0)}
                          addConnectionHref={getCreateAddConnectionHref.bind(
                            null,
                            integration
                          )}
                          addStepHref={getCreateAddStepHref.bind(
                            null,
                            integration
                          )}
                          configureConnectionHref={getConfigureConnectionHrefCallback(
                            integration
                          )}
                          configureStepHref={getConfigureStepHrefCallback(
                            integration
                          )}
                        />
                      )}
                    </WithIntegrationHelpers>
                  </div>
                </>
              }
              footer={
                <>
                  <Link to={resolvers.list()} className={'btn btn-default'}>
                    Cancel
                  </Link>
                  &nbsp;&nbsp;
                  <button className={'btn btn-default'}>Save as draft</button>
                  &nbsp;
                  <button className={'btn btn-primary'}>
                    Save and publish
                  </button>
                </>
              }
            />
          )}
        </WithRouteData>
      </WithClosedNavigation>
    );
  }
}
