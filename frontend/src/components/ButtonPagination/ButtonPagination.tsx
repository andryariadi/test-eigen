"use client";

import { Pagination } from "antd";

const ButtonPagination = ({ total, current, onChange, pageSize = 15 }: { total: number; current: number; onChange: (page: number, pageSize: number) => void; pageSize?: number }) => {
  return (
    <div className="pt-10">
      <Pagination align="center" showSizeChanger={false} current={current} total={Math.min(total, 90)} pageSize={pageSize} onChange={onChange} />
    </div>
  );
};

export default ButtonPagination;
