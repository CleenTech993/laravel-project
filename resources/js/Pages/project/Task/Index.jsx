import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
// import { route } from '../js/ziggy.js';


  // Assuming Pagination is a valid component

export default function Index({ auth, tasks, pagination, errors, queryparams =null }) {
    queryparams =queryparams || {}

    const searchFieldChange = (name, value) => {
        if (value) {
            queryparams[name] = value
        } else {
            delete queryparams[name];
        }


        route.get(route('task.index'), queryparams)
    }

const onKeyPress = (name, e)=> {
    if (e.key !=='Enter') return;

    searchFieldChange(name, e.target.value);

    const sortChange= (name)=> {
        if (name == queryparams.sort_direction == 'asc') {
            queryparams.sort.direction = 'desc'
        }else {
            queryparams.sort.direction = 'asc';
       
        }
    }
    route.get(route('task.index'), queryparams)
}

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>}
        >
            <Head title="Task" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                       <div className="overflow-auto">
                       <table className="w-full text-sm text-left rtl:text-right text-grey-500 dark:text-grey-400">
                            <thead className="text-xs text-grey-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr>
                                    <th onClick={(e) => sortchange('id')}className="px-3 py-3 cursor-pointer">ID</th>
                                    <th className="px-3 py-3">Image</th>
                                    <th onClick={(e) => sortchange('name')}className="px-3 py-3 cursor-pointer">Name</th>
                                    <th onClick={(e) => sortchange('status')}className="px-3 py-3 cursor-pointer">Status</th>
                                    <th onClick={(e) => sortchange('created_at')}className="px-3 py-3 cursor-pointer">Created Date</th>
                                    <th onClick={(e) => sortchange('due_date')}className="px-3 py-3 cursor-pointer">Due Date</th>
                                    <th className="px-3 py-3">Created By</th>
                                    <th className="px-3 py-3" text-right>Action</th>
                                </tr>
                            </thead>
                            <thead className="text-xs text-grey-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3">
                                        <TextInput className="w-full" 
                                        defaulValue= {queryparams.name}
                                        placeholder="Task Name" onBlur={e =>searchFieldChange('name', e.target.value)}
                                            onKeyPress={e => onKeyPress('name', e)}/>
                                    </th>  
                                    <th onClick={(e) => sortchange('id')}className="px-3 py-3">
                                        <SelectInput className="w-full" 
                                        defaulValue={queryparams.status}
                                        onChange={e =>searchFieldChange('status', e.target.value) } >
                                            <option value="">Select Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In progress</option>
                                            <option value="completed">Completed</option>
                                            </SelectInput>
                                    </th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3" text-right></th>
                                </tr>
                            </thead>
                            <tbody>
                                {TASK_STATUS_TEXT_MAP.data && tasks.data.length > 0 ? (
                                    tasks.data.map((task) => (
                                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{task.id}</td>
                                            <td className="px-3 py-2">
                                                <img src={task.image_path}onClick={(e) => sortchange('id')} style={{ width: 60 }} alt="" />
                                            </td>
                                            <td className="px-3 py-2">{task.name}</td>
                                            <td className="px-3 py-2">
                                                <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2">{task.created_at}</td>
                                            <td className="px-3 py-2">{task.due_date}</td>
                                            <td className="px-3 py-2">{task.createdBy.name}</td>
                                            <td className="px-3 py-2">
                                                <Link href={route('task.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                                <Link href={route('task.destroy', task.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-2">No task available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                       </div>

                        {/* Pagination */}
                        <div className="mt-4">
                            {pagination && pagination.links && pagination.links.length > 0 && (
                                <div className="flex justify-center space-x-2">
                                    {pagination.links.map((link) => (
                                        <a key={link.label} href={link.url} className={link.active ? "text-blue-600" : "text-gray-600"}>
                                            {link.label}
                                        </a>
                                    ))}
                                    <pre>{JSON.stringify(tasks, undefined, 2)}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
