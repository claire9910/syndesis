import { WithConnections, WithIntegrationHelpers } from '@syndesis/api';
import { Connection, Integration } from '@syndesis/models';
import { IntegrationEditorLayout } from '@syndesis/ui';
import { WithRouteData } from '@syndesis/utils';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { WithClosedNavigation } from '../../../../../../containers';
import { PageTitle } from '../../../../../../containers/PageTitle';
import {
  IntegrationCreatorBreadcrumbs,
  IntegrationEditorChooseConnection,
  IntegrationEditorSidebar,
} from '../../../../components';
import resolvers from '../../../../resolvers';
import { getCreateSelectActionHref } from '../../../resolversHelpers';

export interface ISelectConnectionRouteParams {
  position: string;
  connectionId: string;
}

export interface ISelectConnectionRouteState {
  connection: Connection;
  integration: Integration;
}

export class SelectConnectionPage extends React.Component {
  public render() {
    return (
      <WithClosedNavigation>
        <WithRouteData<
          ISelectConnectionRouteParams,
          ISelectConnectionRouteState
        >>
          {({ position }, { connection, integration }) => (
            <>
              <PageTitle title={'Choose a connection'} />
              <IntegrationEditorLayout
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
                sidebar={
                  <WithIntegrationHelpers>
                    {({ getSteps }) => {
                      const positionAsNumber = parseInt(position, 10);
                      return (
                        <IntegrationEditorSidebar
                          steps={getSteps(integration, 0)}
                          addAtIndex={positionAsNumber}
                          addI18nTitle={`${positionAsNumber + 1}. Start`}
                          addI18nTooltip={'Start'}
                          addI18nDescription={'Choose a connection'}
                        />
                      );
                    }}
                  </WithIntegrationHelpers>
                }
                content={
                  <WithConnections>
                    {({ data, hasData, error }) => (
                      <IntegrationEditorChooseConnection
                        connections={data.connectionsWithToAction}
                        loading={!hasData}
                        error={error}
                        i18nTitle={'Choose a connection'}
                        i18nSubtitle={
                          'Click the connection that completes the integration. If the connection you need is not available, click Create Connection.'
                        }
                        getConnectionHref={getCreateSelectActionHref.bind(
                          null,
                          position,
                          integration
                        )}
                      />
                    )}
                  </WithConnections>
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
          )}
        </WithRouteData>
      </WithClosedNavigation>
    );
  }
}
