import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import 'primeicons/primeicons.css';
        
import "/node_modules/primeflex/primeflex.css"
import "primeflex/themes/primeone-light.css"
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import axios from 'axios'
import 'primeicons/primeicons.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
function Dashboard() {
    const navigator = useNavigate();

    const [products, setProducts] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      title: { value: null, matchMode: FilterMatchMode.CONTAINS },
      price: { value: null, matchMode: FilterMatchMode.EQUALS },
      // 'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      // representative: { value: null, matchMode: FilterMatchMode.IN },
      // status: { value: null, matchMode: FilterMatchMode.EQUALS },
      // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  
  const onGlobalFilterChange = (e) => {
    console.log("v", e.target.value);
    const value = e.target.value;
    let _filters = { ...filters };
  
    _filters['global'].value = value;
  
    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
        <div className="flex justify-content-end">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
        </div>
    );
  };
  
  useEffect(() => {
    axios.get("http://localhost:4001/Post/getall").then((res) => {
      setProducts(res.data.post);
      // console.log(res.data.post);
    })
  }, []);
  
  const handleEdit = (id) => {
    navigator(`/edit/${id}`)  
  }
  
  const imageBodyTemplate = (product) => {
    return <img src={`http://localhost:4001/${product.image}`} alt={product.image} className=" h-4rem shadow-2 border-round" />;
  };
  
  const actionBodyTemplate = (product) => {
    return (<>
      <div className='flex gap-2'>
        <Button className='text-white py-0' rounded size="small" onClick={() => handleEdit(product._id)} >Edit</Button>
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" size="small" onClick={() => handleEdit(product._id)}  />
      </div>
    </>
    )
  };
  
  const header = renderHeader();
  return (

    <>
    {/* <div>Dashboard</div>
    <div>prime react</div> */}
      <div>
        <DataTable value={products} filters={filters} globalFilterFields={['title', 'price']} header={header} showGridlines={true} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem', backgroundColor: '#9ebdfc' }}>
          <Column field="_id" header="ID" sortable ></Column>
          <Column field="image" header="Image" body={imageBodyTemplate}></Column>
          <Column field="title" filter  header="Name" sortable ></Column>
          <Column field="category" header="Category"></Column>
          <Column field="status" filter header="status" sortable></Column>
          <Column field="action" header="Actions" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      
    </>
    
    
  )
}

export default Dashboard;