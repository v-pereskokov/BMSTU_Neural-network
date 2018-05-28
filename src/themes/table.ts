import styled from 'styled-components';

export const TableWrapper = styled.div`
    margin: 8px;
    position: relative;
    
    .ant-table-column-sorter-up, .ant-table-column-sorter-down {
        cursor: initial;
    }
    
    .clickable-title {
        cursor: pointer;
        color: #108ee9;
    }
    
    td, .ant-table-thead > tr > th {
        text-align: center;
    }
    
    .filters-applied {
        .anticon-filter {
            color: #108ee9;
        }
    }
    
    .table-large {
        th,
        td {
            font-size: 20px;
            padding: 4px 8px !important;
        }
    }
`;
