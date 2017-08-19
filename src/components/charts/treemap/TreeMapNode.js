/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'

const TreeMapNode = ({
    x,
    y,
    width,
    height,
    color,
    borderWidth,
    borderColor,
    hasLabel,
    label,
    labelRotation,
    labelTextColor,
}) =>
    <g transform={`translate(${x},${y})`}>
        <rect
            width={width}
            height={height}
            fill={color}
            strokeWidth={borderWidth}
            stroke={borderColor}
            //onMouseEnter={e => showTooltip('crap', e)}
        />
        {hasLabel &&
            <text
                textAnchor="middle"
                dy="0.5em"
                style={{ fill: labelTextColor, pointerEvents: 'none' }}
                transform={`translate(${width / 2},${height / 2}) rotate(${labelRotation})`}
            >
                {label}
            </text>}
    </g>

TreeMapNode.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    hasLabel: PropTypes.bool.isRequired,
    label: PropTypes.node,
    orientLabel: PropTypes.bool.isRequired,
    labelRotation: PropTypes.number.isRequired, // computed
    labelTextColor: PropTypes.string.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

const enhance = compose(
    withPropsOnChange(['orientLabel', 'width', 'height'], ({ orientLabel, width, height }) => ({
        labelRotation: orientLabel && height > width ? -90 : 0,
    })),
    pure
)

export default enhance(TreeMapNode)