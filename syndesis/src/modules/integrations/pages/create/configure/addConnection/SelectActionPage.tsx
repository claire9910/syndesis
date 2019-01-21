import { WithConnection, WithIntegrationHelpers } from '@syndesis/api';
import { ConnectionOverview, Integration } from '@syndesis/models';
import { IntegrationEditorLayout, Loader } from '@syndesis/ui';
import { WithLoader, WithRouteData } from '@syndesis/utils';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { WithClosedNavigation } from '../../../../../../containers';
import { PageTitle } from '../../../../../../containers/PageTitle';
import {
  IntegrationCreatorBreadcrumbs,
  IntegrationEditorChooseAction,
  IntegrationEditorSidebar,
} from '../../../../components';
import resolvers from '../../../../resolvers';
import { getCreateConfigureActionHref } from '../../../resolversHelpers';

export interface ISelectActionRouteParams {
  connectionId: string;
  position: string;
}

export interface ISelectActionRouteState {
  connection: ConnectionOverview;
  integration: Integration;
}

export class SelectActionPage extends React.Component {
  public render() {
    return (
      <WithClosedNavigation>
        <WithRouteData<ISelectActionRouteParams, ISelectActionRouteState>>
          {({ connectionId, position }, { connection, integration }) => (
            <WithConnection id={connectionId} initialValue={connection}>
              {({ data, hasData, error }) => (
                <WithLoader
                  error={error}
                  loading={!hasData}
                  loaderChildren={<Loader />}
                  errorChildren={<div>TODO</div>}
                >
                  {() => (
                    <>
                      <PageTitle title={'Choose an action'} />
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
                          <WithIntegrationHelpers>
                            {({ getSteps }) => {
                              const positionAsNumber = parseInt(position, 10);
                              return (
                                <IntegrationEditorSidebar
                                  steps={getSteps(integration, 0)}
                                  addAtIndex={positionAsNumber}
                                  addIcon={
                                    hasData ? (
                                      <img
                                        src={data.icon}
                                        width={24}
                                        height={24}
                                      />
                                    ) : (
                                      <Loader />
                                    )
                                  }
                                  addI18nTitle={
                                    hasData
                                      ? `${positionAsNumber + 1}. ${
                                          data.connector!.name
                                        }`
                                      : `${positionAsNumber + 1}. Start`
                                  }
                                  addI18nTooltip={
                                    hasData
                                      ? `${positionAsNumber + 1}. ${data.name}`
                                      : 'Start'
                                  }
                                  addI18nDescription={'Choose an action'}
                                />
                              );
                            }}
                          </WithIntegrationHelpers>
                        }
                        content={
                          <IntegrationEditorChooseAction
                            actions={data.actionsWithTo.sort((a, b) =>
                              a.name.localeCompare(b.name)
                            )}
                            getActionHref={getCreateConfigureActionHref.bind(
                              null,
                              position,
                              integration,
                              data
                            )}
                          />
                        }
                        footer={
                          <Link
                            to={resolvers.create.configure.index({
                              integration,
                            })}
                            className={'btn btn-default'}
                          >
                            Cancel add connection
                          </Link>
                        }
                      />
                    </>
                  )}
                </WithLoader>
              )}
            </WithConnection>
          )}
        </WithRouteData>
      </WithClosedNavigation>
    );
  }
}
