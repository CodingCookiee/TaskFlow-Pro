import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Textarea, Card, CardContent } from '@/components/ui';

import { Pencil, Trash2, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdownMenu";

export default function TaskItem({ task, onDelete, onStatusChange }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task.id);
    setIsDeleting(false);
  };

  const handleEdit = () => {
    router.push(`/edit?id=${task.id}`);
  };

  return (
    <Card className={`transition-all duration-200 ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => onStatusChange(task.id, checked)}
            className="h-5 w-5"
          />
          <div className="flex flex-col">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-500 mt-1">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete}
              className="text-red-600"
              disabled={isDeleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
