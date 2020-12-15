import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class StepIcon extends Component {
    render() {
        let styles;

        const globalStyles = {
            circleStyle: {
                width: 24,
                height: 24,
                borderRadius: 18,
            },
            circleText: {
                alignSelf: 'center',
                top: 4/ 2,
            },
            leftBar: {
                position: 'absolute',
                top: 24 / 2,
                left: 0,
                right: 36 + 8,
                borderTopStyle: this.props.borderStyle,
                borderTopWidth: this.props.borderWidth,
                marginRight: 36 / 2 + 4,
            },
            rightBar: {
                position: 'absolute',
                top: 24 / 2,
                right: 0,
                left: 36 + 8,
                borderTopStyle: this.props.borderStyle,
                borderTopWidth: this.props.borderWidth,
                marginLeft: 36 / 2 + 4,
            },
            labelText: {
                textAlign: 'center',
                flexWrap: 'wrap',
                width: 100,
                paddingTop: 4,
                fontFamily: this.props.labelFontFamily,
                color: this.props.activeLabelColor,
                fontSize: this.props.activeLabelFontSize || this.props.labelFontSize,
            },
        }
        if (this.props.isActiveStep) {
            styles = {
                circleColor: {
                    backgroundColor: this.props.activeStepIconBorderColor,
                },
                leftBarColor: {
                    borderTopColor: this.props.completedProgressBarColor,
                },
                rightBarColor: {
                    borderTopColor: this.props.progressBarColor,
                },
                stepNum: {
                    color: this.props.activeStepNumColor,
                },
            };
        } else if (this.props.isCompletedStep) {
            styles = {
                circleColor: {
                    backgroundColor: this.props.completedStepIconColor,
                },
                leftBarColor: {
                    borderTopColor: this.props.completedProgressBarColor,
                },
                rightBarColor: {
                    borderTopColor: this.props.completedProgressBarColor,
                },
                stepNum: {
                    color: this.props.completedStepNumColor,
                },
            };
        } else {
            styles = {
                circleColor: {
                    backgroundColor: this.props.disabledStepIconColor,
                },
                leftBarColor: {
                    borderTopColor: this.props.progressBarColor,
                },
                rightBarColor: {
                    borderTopColor: this.props.progressBarColor,
                },
                stepNum: {
                    color: this.props.disabledStepNumColor,
                },
            };
        }
        styles = { ...styles, ...globalStyles}

        return (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={[styles.circleStyle, styles.circleColor]}>
                    <Text style={styles.circleText}>
                        {this.props.isCompletedStep ? (
                            <Text style={{ color: this.props.completedCheckColor }}>&#10003;</Text>
                        ) : (
                            <Text/>
                        )}
                    </Text>
                </View>
                <Text style={styles.labelText}>{this.props.label}</Text>
                {!this.props.isFirstStep && <View style={[styles.leftBar, styles.leftBarColor]} />}
                {!this.props.isLastStep && <View style={[styles.rightBar, styles.rightBarColor]} />}
            </View>
        );
    }
}

StepIcon.propTypes = {
    stepCount: PropTypes.number.isRequired,
    stepNum: PropTypes.number.isRequired,
    isFirstStep: PropTypes.bool.isRequired,
    isLastStep: PropTypes.bool.isRequired,

    borderWidth: PropTypes.number,
    borderStyle: PropTypes.string,
    activeStepIconBorderColor: PropTypes.string,

    progressBarColor: PropTypes.string,
    completedProgressBarColor: PropTypes.string,

    activeStepIconColor: PropTypes.string,
    disabledStepIconColor: PropTypes.string,
    completedStepIconColor: PropTypes.string,

    labelFontFamily: PropTypes.string,
    labelColor: PropTypes.string,
    labelFontSize: PropTypes.number,
    activeLabelColor: PropTypes.string,
    activeLabelFontSize: PropTypes.number,
    completedLabelColor: PropTypes.string,

    activeStepNumColor: PropTypes.string,
    completedStepNumColor: PropTypes.string,
    disabledStepNumColor: PropTypes.string,

    completedCheckColor: PropTypes.string,
};

StepIcon.defaultProps = {
    borderWidth: 3,
    borderStyle: 'solid',
    activeStepIconBorderColor: '#4BB543',

    progressBarColor: '#ebebe4',
    completedProgressBarColor: '#4BB543',

    activeStepIconColor: 'transparent',
    completedStepIconColor: '#4BB543',
    disabledStepIconColor: '#ebebe4',

    labelColor: 'lightgray',
    labelFontSize: 14,
    activeLabelColor: '#4BB543',
    completedLabelColor: 'lightgray',

    activeStepNumColor: 'black',
    completedStepNumColor: 'black',
    disabledStepNumColor: 'white',

    completedCheckColor: 'white',
};

export default StepIcon;
