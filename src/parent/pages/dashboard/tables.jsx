import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/parent/data";
import Assignee from "@/parent/attributes/Assignee";
import Tags from "@/parent/Report/Tags";
import { SkillTasks } from "@/parent/Report/SkillTasks";

export function Tables() {
  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <div className="flex">
        <Tags />
        <div className="ml-3">
          <Assignee />
        </div>
      </div>

      <Card>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0"></CardBody>
      </Card>
      <Card>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <div className="mb-8">
            <SkillTasks />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
