import React from 'react'
import {
    useTransition
} from 'react-spring'
import {
    useDarkMode
} from 'hooks'
import {
    Box,
    Div,
    SunIcon,
    MoonIcon,
    SunMoonIcon,
    Notification
} from './styles'
import {
    Link
} from 'gatsby'

export default function DarkMode({
    initial,
    ...rest
}) {
    const [, colorMode, setColorMode] = useDarkMode(initial)
    const Modes = {
        light: {
            Icon: SunIcon,
            title: `Light Mode`,
            nextMode: `dark`
        },
        dark: {
            Icon: MoonIcon,
            title: `Dark Mode`,
            nextMode: `noPreference`
        },
        noPreference: {
            Icon: SunMoonIcon,
            title: `Use OS setting`,
            render: ( <
                >
                OS setting( < Link to = "/blog3/use-dark-mode" > details < /Link>) <
                    />
                ),
                nextMode: `light`,
            },
        }
        const transitions = useTransition(colorMode, null, {
            initial: null,
            from: {
                opacity: 0,
                transform: `translateX(100%)`
            },
            enter: {
                opacity: 1,
                transform: `translateX(0%)`
            },
            leave: {
                opacity: 0,
                transform: `translateX(-100%)`
            },
        })
        return ( <
            Box {
                ...rest
            } > {
                transitions.map(({
                    item,
                    props,
                    key
                }) => {
                    const {
                        Icon,
                        title,
                        render,
                        nextMode
                    } = Modes[item]
                    return ( <
                        Div key = {
                            key
                        }
                        style = {
                            props
                        } >
                        <
                        Icon title = {
                            title
                        }
                        onClick = {
                            () => setColorMode(nextMode)
                        }
                        // onTouchStart needed to react on first tap in iOS Safari.
                        onTouchStart = {
                            () => setColorMode(nextMode)
                        }
                        /> <
                        Notification > {
                            render || title
                        } < /Notification> <
                        /Div>
                    )
                })
            } <
            /Box>
        )
    }