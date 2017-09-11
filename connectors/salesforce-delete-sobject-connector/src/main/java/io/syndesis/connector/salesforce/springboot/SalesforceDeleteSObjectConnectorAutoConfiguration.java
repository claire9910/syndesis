package io.syndesis.connector.salesforce.springboot;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.Generated;
import javax.annotation.PostConstruct;
import io.syndesis.connector.salesforce.SalesforceDeleteSObjectComponent;
import org.apache.camel.CamelContext;
import org.apache.camel.util.IntrospectionSupport;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

/**
 * Generated by camel-connector-maven-plugin - do not edit this file!
 */
@Generated("org.apache.camel.maven.connector.SpringBootAutoConfigurationMojo")
@Configuration
@ConditionalOnBean(type = "org.apache.camel.spring.boot.CamelAutoConfiguration")
@AutoConfigureAfter(name = "org.apache.camel.spring.boot.CamelAutoConfiguration")
@EnableConfigurationProperties(SalesforceDeleteSObjectConnectorConfiguration.class)
public class SalesforceDeleteSObjectConnectorAutoConfiguration {

    @Autowired
    private CamelContext camelContext;
    @Autowired
    private SalesforceDeleteSObjectConnectorConfiguration configuration;

    @Lazy
    @Bean(name = "salesforce-delete-sobject-component")
    @ConditionalOnClass(CamelContext.class)
    @ConditionalOnMissingBean(name = "salesforce-delete-sobject-component")
    public SalesforceDeleteSObjectComponent configureSalesforceDeleteSObjectComponent()
            throws Exception {
        SalesforceDeleteSObjectComponent connector = new SalesforceDeleteSObjectComponent();
        connector.setCamelContext(camelContext);
        Map<String, Object> parameters = new HashMap<>();
        IntrospectionSupport.getProperties(configuration, parameters, null,
                false);
        IntrospectionSupport.setProperties(camelContext,
                camelContext.getTypeConverter(), connector, parameters);
        connector.setComponentOptions(parameters);
        return connector;
    }

    @PostConstruct
    public void postConstructSalesforceDeleteSObjectComponent() {
        if (camelContext != null) {
            Map<String, Object> parameters = new HashMap<>();
            for (Map.Entry<String, SalesforceDeleteSObjectConnectorConfigurationCommon> entry : configuration
                    .getConfigurations().entrySet()) {
                parameters.clear();
                SalesforceDeleteSObjectComponent connector = new SalesforceDeleteSObjectComponent();
                connector.setCamelContext(camelContext);
                try {
                    IntrospectionSupport.getProperties(entry.getValue(),
                            parameters, null, false);
                    IntrospectionSupport.setProperties(camelContext,
                            camelContext.getTypeConverter(), connector,
                            parameters);
                    connector.setComponentOptions(parameters);
                    camelContext.addComponent(entry.getKey(), connector);
                } catch (Exception e) {
                    throw new BeanCreationException(entry.getKey(),
                            e.getMessage(), e);
                }
            }
        }
    }
}