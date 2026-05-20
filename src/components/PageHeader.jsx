export default function PageHeader({ title, breadcrumb }) {
    return (
        <div className="flex items-center justify-between mb-5">

            <div>

                <h1 className="text-3xl font-bold text-gray-800">
                    {title}
                </h1>

                <p className="text-gray-500 mt-1">
                    Dashboard / {breadcrumb}
                </p>

            </div>

        </div>
    );
}