export function Button(props) {
    return (
        <>
            <button className={props.className || ''} type={props.type || 'button'}>
                {props.text}
            </button>
        </>
    )
}