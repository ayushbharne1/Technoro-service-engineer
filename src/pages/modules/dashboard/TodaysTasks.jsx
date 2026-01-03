import React from "react";

const TodaysTasks = ({ tasks, recentCompleted }) => {
  // Show today's tasks if available, otherwise show recent completed tasks
  const displayTasks = tasks.length > 0 ? tasks : recentCompleted;
  const title = tasks.length > 0 ? "Today's Task" : "Recent Completed Tasks";

  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col gap-4 h-[350px] w-[350px]">
      <h3 className="font-semibold text-base text-[#263138] self-stretch">
        {title}
      </h3>
      <div className="bg-white p-4 flex-grow rounded-lg overflow-y-auto scrollbar-hide">
        {displayTasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks available</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {displayTasks.map((item, index) => (
              <li
                key={item.id || index}
                className="flex items-center justify-between"
              >
                <span className="text-[#606060] text-base font-normal flex-grow">
                  {index + 1}. {item.service || item.task || "Task"}
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
