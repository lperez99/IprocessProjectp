import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import React from 'react'
import mockData from '../data.json';
import '../index.css'
import { useState } from 'react'

function Table() {

    const [data, setData] = React.useState(() => [...mockData]);
    const columnHelper = createColumnHelper();  

    const Person = {
        id: 0,
        name: '',
        email: '',
        phone: ''
       };
       
       const columns = [
            columnHelper.accessor('id', {
                cell: info => info.getValue(),
            }),
            columnHelper.accessor('name', {
                cell: info => info.getValue(),
            }),
            //Cómo se renderiza el cntenido en un <i>
            columnHelper.accessor(row => row.email, {
                id: 'email',
                cell: info => <i>{info.getValue()}</i>,
                header: () => <span>Email</span>,
            }),
            columnHelper.accessor('phone', {
                header: () => 'Phone',
                cell: info => info.renderValue(),
            })
       ];
       
       // const [data] = React.useState(() => [...mockData]);
       
        const table = useReactTable({
           data,
           columns,
           getCoreRowModel: getCoreRowModel(),
        });

        const addPerson = (person) => {
            const emailExists = data.some(p => p.email === person.email);
            if (!emailExists) {
              setData([...data, person]);
            } else {
              alert('El email ya existe en la tabla');
            }
         };
        
         const deletePerson = (id) => {
            setData(data.filter(person => person.id !== id));
         };
       
    // Renderizar la tabla
    

    return (
        <div className="flex flex-col items-center justify-center h-screen">
           <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-4 border-2 border-gray-300">
             <form onSubmit={(e) => {
               e.preventDefault();
               const newPerson = {
                 id: data.length + 1, // Generar un nuevo ID
                 name: e.target.name.value,
                 email: e.target.email.value,
                 phone: e.target.phone.value,
               };
               addPerson(newPerson);
               e.target.reset(); // Limpiar el formulario
             }}>
                <div className="space-y-3">
                    <div className="space-y-1"> 
                    {/*campos obligatorios */}
                        <input type="text" name="name" placeholder="Name" required className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800" />
                        <input type="email" name="email" placeholder="Email" required className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800" />
                        <input type="text" name="phone" placeholder="Phone" required className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800" />
                </div>
                    <button type="submit" className="w-full px-3 py-2 bg-header-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ">Add Person</button>
                </div>
             </form>
           </div>
           <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-8 ">
             <table className="w-full text-sm text-left rtl:text-right  dark:text-gray-400 border-gray-300">
               <thead className="text-xs uppercase bg-header-bg dark:text-gray-400">
                 {table.getHeaderGroups().map(headerGroup => (
                   <tr key={headerGroup.id} className="border-b text-gray-800 uppercase">
                     {headerGroup.headers.map(header => (
                       <th key={header.id} className="px-6 py-3">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                       </th>
                     ))}
                   </tr>
                 ))}
               </thead>
               <tbody>
                 {table.getRowModel().rows.map((row, index) => (
                   <tr key={row.id} className={`${index % 2 === 0 ? 'bg-row-bg' : 'bg-row-bg-alt'} border-b dark:border-gray-300`}>
                     {row.getVisibleCells().map(cell => (
                       <td key={cell.id} className="px-6 py-4 text-text-blue">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                       </td>
                     ))}
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
       );
       
       
 }

export default Table;
