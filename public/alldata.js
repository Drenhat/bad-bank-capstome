function AllData(){
    // const [data, setData] = React.useState('');
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');      

    // React.useEffect(() => {
        
    //     // fetch all accounts from API
    //     fetch('/account/all')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             setData(JSON.stringify(data));                
    //         });

    // }, []);

    return (<>
        {/* <h5>All Data in Store:</h5>
        {data} */}
        <Card
        bgcolor="info"
        header="Alldata"
        status={status}
        body={show ?
            <AlldataForm setShow={setShow} setStatus={setStatus}/> :
            <AlldataMsg setShow={setShow} setStatus={setStatus}/>}
    />
    </>);
}

function AlldataMsg(props){
    return ( <>
        <h5>You Have to connect first</h5>
    </>
    )
}

function AlldataForm(props) {

    const [data, setData] = React.useState('');

    React.useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));                
            });

    }, []);

    return (<>
        User<br/>
        <h5>{data}</h5> <br/>   
      </>);
}
