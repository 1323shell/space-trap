export default theme => ({
    '@global': {
        '*, :after, :before': {
            boxSizing: 'border-box',
            userSelect: 'none',
        },
        html: {
            fontSize: '100%',
        },
        body: {
            margin: 0,
            padding: 0,
            textAlign: 'center',
        },
        button: {
            width: '50px',
            height: '50px',
            fontSize: theme.size.normal,
            border: 'none',
            outline: 'none',
            opacity: 1,
            transition: 'all 0.1s ease-in',
            '&:hover': {
                cursor: 'pointer',
                opacity: 0.8,
            },
            '&:not(:last-child)': {
                marginRight: '5px',
            },
        },
    },
});