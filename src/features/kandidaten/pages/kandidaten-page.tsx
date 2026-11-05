import { useParams } from 'react-router';

import KandidaatDetail from '../components/kandidaat-detail/kandidaat-detail';
import Kandidaten from '../components/kandidaten/kandidaten';

const KandidatenPage = () => {
  const { id } = useParams<{ id?: string }>();

  if (id) {
    return <KandidaatDetail id={id} />;
  }

  return <Kandidaten />;
};

export default KandidatenPage;
