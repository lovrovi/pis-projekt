import './Registrations.css'
import { Title } from '../../containers/Title/Title'
import { RegistrationsTable } from './RegistrationsTable';

export const Registrations = () => {
  return (
    <div className="registrations">
    <div className="registrationsHeader">
        <div className="registrationsHeaderTitle">
            <Title
                label="Registrations"
            />
        </div>
    </div>
    <RegistrationsTable />
</div>
  );
};
