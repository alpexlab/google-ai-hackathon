import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const EasyNav = ({ patient, report }: { patient: string; report?: string }) => {
  return (
    <div className='m-3'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to='/u'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={`/details/?patient=${patient}`}>Details</Link>
          </BreadcrumbItem>
          {report && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to={`/${report}/?patient=${patient}`}>Report</Link>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default EasyNav;
