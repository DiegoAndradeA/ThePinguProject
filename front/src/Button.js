export function Button(props) {
    console.log(props)
    return <button>
        {props.text}
    </button>
}