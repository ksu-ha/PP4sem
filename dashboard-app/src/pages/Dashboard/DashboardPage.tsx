import Header from '../../components/common/Header/Header';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Meetings from '../../components/Meetings/Meetings';
import AccordionItem from '../../components/AccordionItem/AccordionItem';
import { testCases, testTeams } from '../../data';
import './dashboard.css';

const DashboardPage = () => {
  const handleOpenFullCase = (caseId: string) => {
    console.log('Open full case:', caseId);
  };

  const handleComment = (caseId: string) => {
    console.log('Comment on case:', caseId);
  };

  const handleOpenFullTeam = (teamId: string) => {
    console.log('Open full team:', teamId);
  };

  const handleViewAllCases = () => {
    console.log('Navigate to all cases');
  };

  const handleViewAllTeams = () => {
    console.log('Navigate to all teams');
  };

  const casesUnderReview = testCases.filter(c => c.status === 'На оценке');
  const otherCases = testCases.filter(c => c.status !== 'На оценке');

  return (
    <div className="page-wrapper">
      <Header />
      <ActionButtons />
      <main className="main-content">
        <Meetings />

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Все кейсы</h2>
          </div>

          {casesUnderReview.map((caseItem) => (
            <AccordionItem
              key={caseItem.id}
              type="case"
              title={caseItem.title}
              description={caseItem.description}
              status={caseItem.status}
              defaultOpen={false}
              likes={caseItem.likes}
              dislikes={caseItem.dislikes}
              onOpenFull={() => handleOpenFullCase(caseItem.id)}
              onComment={() => handleComment(caseItem.id)}
            />
          ))}

          {otherCases.map((caseItem) => (
            <AccordionItem
              key={caseItem.id}
              type="case"
              title={caseItem.title}
              description={caseItem.description}
              status={caseItem.status}
              defaultOpen={false}
              onOpenFull={() => handleOpenFullCase(caseItem.id)}
            />
          ))}

          <button className="view-all-btn" onClick={handleViewAllCases}>
            Перейти ко всем кейсам
          </button>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Команды</h2>
          </div>

          {testTeams.map((team) => (
            <AccordionItem
              key={team.id}
              type="team"
              title={team.name}
              description={team.description}
              defaultOpen={false}
              onOpenFull={() => handleOpenFullTeam(team.id)}
            />
          ))}

          <button className="view-all-btn" onClick={handleViewAllTeams}>
            Перейти ко всем командам
          </button>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;