import React, { Component }                         from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes                                    from 'prop-types';

class ProgressStep extends Component {
    render() {
        const scrollViewProps = this.props.scrollViewProps || {};
        const viewProps = this.props.viewProps || {};
        const isScrollable = this.props.scrollable;

        return (
            <View style={{ flex: 1 }}>
                {isScrollable
                    ? <ScrollView {...scrollViewProps}>{this.props.children}</ScrollView>
                    : <View {...viewProps}>{this.props.children}</View>}
            </View>
        );
    }
}

ProgressStep.propTypes = {
    scrollViewProps: PropTypes.object,
    viewProps: PropTypes.object,
    errors: PropTypes.bool,
    scrollable: PropTypes.bool
};

ProgressStep.defaultProps = {
    errors: false,
    scrollable: true
};

export default ProgressStep;
