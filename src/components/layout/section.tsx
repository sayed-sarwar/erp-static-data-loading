export const Section = (props: any) => {
  console.log("Section props:", props);
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100 bg-amber-200 ">
        {props.item.data && props.item.data.length > 0 ? (
          props.item.data.map((dataItem: any, index: number) => {
            return (
              <li className="flex justify-between gap-x-10 p-5">
                <div className="flex min-w-0 gap-x-6">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {
                        dataItem.name /* Accessing name property from dataItem */
                      }
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      leslie.alexander@example.com
                    </p>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p>No data available</p>
        )}
      </ul>
    </>
  );
};
