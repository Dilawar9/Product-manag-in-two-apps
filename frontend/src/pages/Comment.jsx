import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
function Comment() {


  const [products, setProducts] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [update, setIsButtonEnabled] = useState(false);
  const isUserDisabled = (status) => status === 'aprroved'
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
const header = renderHeader();

  useEffect(() => {
    axios.get('http://localhost:4001/post/getcomments').then((res) => {
      // console.log(res.data.data,"sadad")
   
      setProducts(res.data.data)

    })
  }, [isUserDisabled]);

  const handleEdit = (id) => {
   
    axios.put(`http://localhost:4001/post/create/${id}`,{
      
        status:"aprroved"
       
    }).then((res) => {
      setIsButtonEnabled(true)
     }).catch((e)=>{
      setIsButtonEnabled(false)
     })
  }
  const handledelete = (id) => {
    alert(id)
    axios.delete(`http://localhost:4002/user/dellcomments/${id}`).then((res) => {
      console.log(res)
      
    })
  }
  const imageBodyTemplate = (product) => {
    return <img src={`http://localhost:4002/${product.image}`} alt={product.image} className=" h-4rem shadow-2 border-round" />;
  };
  
  const actionBodyTemplate = (product) => {
    const isDisabled = isUserDisabled(product.status);
    return (<>
      <div className='flex gap-2'>
        <Button className='text-white py-0' disabled={isDisabled} size="small" onClick={() => handleEdit(product._id)} >Approved</Button>
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" size="small"  onClick={() => handledelete(product._id)}/>
      </div>
    </>
    )
  };
  return (
    <>
    <h1>coments</h1>

    <div className="card">
      <DataTable value={products} filters={filters} globalFilterFields={['title', 'price']} header={header} showGridlines={true} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '30rem', backgroundColor: '#9ebdfc' }}>
        
        
          <Column field="comment" filter  header="title" sortable ></Column>
          
          <Column field="status" filter header="body" sortable></Column>
          <Column field="action" header="Actions" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
    
    </>
  )
}

export default Comment;