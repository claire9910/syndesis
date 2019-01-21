import { WithIntegrationHelpers } from '@syndesis/api';
import { ConnectionOverview, Integration } from '@syndesis/models';
import { IntegrationEditorLayout } from '@syndesis/ui';
import { WithRouteData } from '@syndesis/utils';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { WithClosedNavigation } from '../../../../../../containers';
import { PageTitle } from '../../../../../../containers/PageTitle';
import {
  IntegrationCreatorBreadcrumbs,
  IntegrationEditorConfigureConnection,
  IntegrationEditorSidebar,
  IOnUpdatedIntegrationProps,
} from '../../../../components';
import resolvers from '../../../../resolvers';

export interface IConfigureActionRouteParams {
  position: string;
  actionId: string;
  step?: string;
}

export interface IConfigureActionRouteState {
  connection: ConnectionOverview;
  integration: Integration;
  updatedIntegration?: Integration;
}

export class ConfigureActionPage extends React.Component {
  public render() {
    return (
      <WithClosedNavigation>
        <WithIntegrationHelpers>
          {({ addConnection, getSteps, updateConnection }) => (
            <WithRouteData<
              IConfigureActionRouteParams,
              IConfigureActionRouteState
            >>
              {(
                { actionId, step = '0', position },
                { connection, integration, updatedIntegration },
                { history }
              ) => {
                const stepAsNumber = parseInt(step, 10);
                const positionAsNumber = parseInt(position, 10);
                const onUpdatedIntegration = async ({
                  action,
                  moreConfigurationSteps,
                  values,
                }: IOnUpdatedIntegrationProps) => {
                  updatedIntegration = await (stepAsNumber === 0
                    ? addConnection
                    : updateConnection)(
                    updatedIntegration || integration,
                    connection,
                    action,
                    0,
                    positionAsNumber,
                    values
                  );
                  if (moreConfigurationSteps) {
                    history.push(
                      resolvers.create.configure.addConnection.configureAction({
                        actionId,
                        connection,
                        integration,
                        position,
                        step: stepAsNumber + 1,
                        updatedIntegration,
                      })
                    );
                  } else {
                    history.push(
                      resolvers.create.configure.index({
                        integration: updatedIntegration,
                      })
                    );
                  }
                };

                return (
                  <>
                    <PageTitle title={'Configure the action'} />
                    <IntegrationEditorLayout
                      header={
                        <IntegrationCreatorBreadcrumbs
                          step={3}
                          startConnection={
                            integration.flows![0].steps![0].connection
                          }
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
                      sidebar={
                        <IntegrationEditorSidebar
                          steps={getSteps(updatedIntegration || integration, 0)}
                          addAtIndex={
                            stepAsNumber === 0 ? positionAsNumber : undefined
                          }
                          addIcon={
                            <img src={connection.icon} width={24} height={24} />
                          }
                          addI18nTitle={`${positionAsNumber + 1}. ${
                            connection.connector!.name
                          }`}
                          addI18nTooltip={`${positionAsNumber + 1}. ${
                            connection.name
                          }`}
                          addI18nDescription={'Configure the action'}
                        />
                      }
                      content={
                        <IntegrationEditorConfigureConnection
                          connection={connection}
                          actionId={actionId}
                          configurationStep={stepAsNumber}
                          backLink={resolvers.create.configure.addConnection.selectAction(
                            { position, integration, connection }
                          )}
                          onUpdatedIntegration={onUpdatedIntegration}
                        />
                      }
                      footer={
                        <Link
                          to={resolvers.create.configure.index({ integration })}
                          className={'btn btn-default'}
                        >
                          Cancel add connection
                        </Link>
                      }
                    />
                  </>
                );
              }}
            </WithRouteData>
          )}
        </WithIntegrationHelpers>
      </WithClosedNavigation>
    );
  }
}
