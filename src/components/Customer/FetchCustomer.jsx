//render() {
//    const { cProfiles } = this.state;
//    return (
//        <div className="mt-5 d-flex justify-content-center">
//            <table className="table table-striped" >
//                <thead>
//                    <tr>
//                        <th scope="col">ID</th>
//                        <th scope="col">Name</th>
//                        <th scope="col">BillingAddress</th>
//                        <th scope="col">DefaultShippingAddress</th>
//                        <th scope="col">Country</th>
//                        <th scope="col">City</th>
//                        <th scope="col">ZipCode</th>
//                        <th scope="col">Orders</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {cProfiles.map(cProfile =>
//                        <tr key={cProfile.Id}>
//                            <td scope="row">{cProfile.Name}</td>
//                            <td scope="row">{cProfile.BillingAddress}</td>
//                            <td scope="row">{cProfile.DefaultShippingAddress}</td>
//                            <td scope="row">{cProfile.Country}</td>
//                            <td scope="row">{cProfile.City}</td>
//                            <td scope="row">{cProfile.ZipCode}</td>
//                            <td scope="row">Edit / Delete</td>
//                        </tr>
//                    )
//                    }
//                </tbody>
//            </table>
//        </div>
//    );


//constructor(props) {
//    super(props);
//    this.state = { cProfiles: [], loading: true };
//}

//refreshList() {
//    fetch(process.env.REACT_APP_API + 'customer')
//    .then(response => response.json())
//    .then(data => {
//        this.setState({ cProfiles: data })
//    });
//}
async customerData() {
//    const token = await authService.getAccessToken();
//    const response = await fetch('customer', {
//        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
//    });
//    const data = await response.json();
//    this.setState({ cProfiles: data, loading: false });
//}

//componentDidMount() {
//    this.customerData();
//}

//componentDidUpdate() {
//    this.customerData();
//}


