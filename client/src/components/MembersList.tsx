import React from 'react';
import { Member } from '../types';

interface MembersListProps {
  members: Member[];
  onDeleteMember: (id: number) => void;
  onRefresh: () => void;
}

const MembersList: React.FC<MembersListProps> = ({ members, onDeleteMember, onRefresh }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (members.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">暂无登记信息</p>
        <button
          onClick={onRefresh}
          className="mt-4 text-purple-600 hover:text-purple-700 underline"
        >
          刷新
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          共 {members.length} 位成员已登记
        </p>
        <button
          onClick={onRefresh}
          className="text-purple-600 hover:text-purple-700 text-sm underline"
        >
          刷新列表
        </button>
      </div>
      
      <div className="grid gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">空闲时间：</span>
                  {member.available_time}
                </p>
                <p className="text-sm text-gray-500">
                  登记时间：{formatDate(member.created_at)}
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm(`确定要删除 ${member.name} 的登记信息吗？`)) {
                    onDeleteMember(member.id);
                  }
                }}
                className="ml-4 text-red-600 hover:text-red-700 text-sm underline"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList; 