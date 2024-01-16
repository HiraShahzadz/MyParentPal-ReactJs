import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/parent/data";
import Assignee from "@/parent/attributes/Assignee";
import Tags from "@/parent/Report/Tags";
import { SkillTasks } from "@/parent/Report/SkillTasks";
import ChildSelection from "@/parent/Report/ChildSelection";
import ProgressGraph from "@/parent/Report/ProgressGraph";

export function ChildReport() {
  return (
    <div className="mb-8 mt-9 flex flex-col gap-12">
      <Card>
        <div className=" ml-6 mr-6 ">
          <div className="mb-1 mt-6  w-full pr-10">
            <div className="text-left text-lg font-bold text-black">
              Child Progress Report
            </div>
          </div>
          <div className="mt-4 flex">
            <Tags />
            <div className="mb-2 ml-3">
              <ChildSelection />
            </div>
          </div>

          <div className="border-b">
            <ProgressGraph />
          </div>
        </div>

        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <div className="mb-8">
            <SkillTasks />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ChildReport;
