import {
  Typography
} from '@material-ui/core';
import withTitleUpdate from '../../reusable/hocs/withTitleUpdate';


function StatisticsPage() {

  return (
    <div className='container'>
      <Typography variant='h1' color='secondary' className='heading'>
        Добро пожаловать в программу Pomodoro!
      </Typography>
      <Typography paragraph>
        Метод «Помодоро» — это техника управления временем, разработанная студентом
        колледжа Франческо Чирилло в 1980-х годах. В основе техники, названной от
        итальянского слова «помидор», лежат многочисленные временные интервалы,
        распределённые в течение дня и обозначенные на кухонном таймере в форме помидора,
        который Чирилло использовал сам, когда оттачивал свой метод управления временем.
      </Typography>

      <Typography paragraph>
        Базовая структура техники «Помодоро», призванной быть простой в применении и в то
        же время давать большие преимущества с точки зрения производительности,
        заключается в следующем:
      </Typography>
    </div>
  );
}

export default withTitleUpdate(StatisticsPage, 'Статистика');
