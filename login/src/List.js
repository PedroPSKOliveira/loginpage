function List({itens}) {

    return (
        <>
        <h3>Direitos</h3>
    {
        itens.map((item) => (
            <p className="p-list">{item}</p>

        ))


    }
        </>
    )
}

export default List;