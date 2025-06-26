import React, { useState } from 'react';

interface RegistrationFormProps {
  onAddMember: (name: string, availableTime: string) => Promise<boolean>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onAddMember }) => {
  const [name, setName] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !availableTime.trim()) {
      alert('请填写姓名和空闲时间');
      return;
    }

    setIsSubmitting(true);
    const success = await onAddMember(name.trim(), availableTime.trim());
    
    if (success) {
      setName('');
      setAvailableTime('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          姓名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-gray-50 text-gray-900 text-base transition"
          placeholder="请输入您的姓名"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="availableTime" className="block text-sm font-medium text-gray-700 mb-1">
          空闲时间段 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="availableTime"
          value={availableTime}
          onChange={(e) => setAvailableTime(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-gray-50 text-gray-900 text-base transition"
          placeholder="如：工作日晚上7点后，周末全天等"
          required
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-400 text-white py-2.5 px-4 rounded-full font-semibold text-lg shadow-md hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? '提交中...' : '提交登记'}
      </button>
    </form>
  );
};

export default RegistrationForm; 