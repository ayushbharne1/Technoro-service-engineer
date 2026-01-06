import React from "react";

const TodaysTasks = ({ tasks, recentCompleted }) => {
  const displayTasks = tasks.length > 0 ? tasks : recentCompleted;
  const title = tasks.length > 0 ? "Today's Task" : "Recent Completed Tasks";

  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col gap-4 h-[350px] w-full lg:w-[350px]">
      <h3 className="font-semibold text-base text-[#263138] self-stretch">{title}</h3>
      <div className="bg-white p-4 flex-grow rounded-lg overflow-y-auto scrollbar-hide">
        {displayTasks.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No tasks available</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {displayTasks.map((item, index) => (
              <li key={item.id || index} className="flex items-center justify-between border-b border-gray-50 pb-2">
                <span className="text-[#606060] text-sm font-normal flex-grow line-clamp-2">
                  {index + 1}. {item.service || "Service Maintenance"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodaysTasks;