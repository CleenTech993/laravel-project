import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { route } from '/js/ziggy.js';
  // Correct import for Ziggy

import Pagination from "@/Components/Pagination";  // Assuming Pagination is a valid component

export default function Index({ auth, projects, pagination, errors }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-grey-500 dark:text-grey-400">
                            <thead className="text-xs text-grey-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr>
                                    <th className="px-3 py-3">ID</th>
                                    <th className="px-3 py-3">Image</th>
                                    <th className="px-3 py-3">Name</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3">Created Date</th>
                                    <th className="px-3 py-3">Due Date</th>
                                    <th className="px-3 py-3">Created By</th>
                                    <th className="px-3 py-3" text-right>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data && projects.data.length > 0 ? (
                                    projects.data.map((project) => (
                                        <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{project.id}</td>
                                            <td className="px-3 py-2">
                                                <img src={project.image_path} style={{ width: 60 }} alt="" />
                                            </td>
                                            <td className="px-3 py-2">{project.name}</td>
                                            <td className="px-3 py-2">
                                                <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2">{project.created_at}</td>
                                            <td className="px-3 py-2">{project.due_date}</td>
                                            <td className="px-3 py-2">{project.createdBy.name}</td>
                                            <td className="px-3 py-2">
                                                <Link href={route('project.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                                <Link href={route('project.destroy', project.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-2">No projects available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="mt-4">
                            {pagination && pagination.links && pagination.links.length > 0 && (
                                <div className="flex justify-center space-x-2">
                                    {pagination.links.map((link) => (
                                        <a key={link.label} href={link.url} className={link.active ? "text-blue-600" : "text-gray-600"}>
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
