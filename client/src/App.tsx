import React, { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import MembersList from './components/MembersList';
import { Member } from './types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取所有成员
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/members`);
      if (!response.ok) {
        throw new Error('获取数据失败');
      }
      const data = await response.json();
      setMembers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 添加新成员
  const addMember = async (name: string, availableTime: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, available_time: availableTime }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '添加失败');
      }

      const newMember = await response.json();
      setMembers(prev => [newMember, ...prev]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '添加失败');
      return false;
    }
  };

  // 删除成员
  const deleteMember = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/members/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除失败');
      }

      setMembers(prev => prev.filter(member => member.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8fa] py-8 px-2 sm:px-4">
      <div className="max-w-2xl mx-auto">
        {/* 头部 */}
        <header className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center mb-3 shadow-lg">
            <span className="text-3xl font-extrabold text-white select-none">S</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
            Singularity Academy
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-medium">
            团队合影登记系统
          </p>
        </header>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {/* 登记表单 */}
        <section className="bg-white rounded-2xl shadow-md p-5 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
            快速登记你的空闲时间
          </h2>
          <RegistrationForm onAddMember={addMember} />
        </section>

        {/* 成员列表 */}
        <section className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            已登记成员 <span className="text-purple-500">({members.length})</span>
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
              <p className="mt-2 text-gray-500">加载中...</p>
            </div>
          ) : (
            <MembersList 
              members={members} 
              onDeleteMember={deleteMember}
              onRefresh={fetchMembers}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App; 