import './infoPage.scss'
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import withTitleUpdate from '../../reusable/hocs/withTitleUpdate';
import tomato from '../../assets/img/tomato.svg';
import rulesList from '../../common/staticData/instructionList';


function InfoPage() {

  return (
    <div className='container'>
      <Typography variant='h1' color='secondary' className='heading'>
        Добро пожаловать в Pomodoro!
      </Typography>

      <Divider className='mb-30'/>

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

      <List>
        {
          rulesList.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon style={{ minWidth: '2rem' }}>
                <span className='list__item__img' style={{ backgroundImage: `url(${tomato})` }}/>
              </ListItemIcon>
              <ListItemText primary={item}/>
            </ListItem>
          ))
        }
      </List>

      <Typography paragraph>
        Данное приложение разработано в качестве дипломного проекта курса «JavaScript-фреймворк React.js»
        онлайн университета SKILLBOX. Программа написана языком JavaScript c использованием React, React-router,
        Material-UI. Хранение состояния приложения в LocalStorage. Больше моих работ по ссылке &ensp;
        <Link
          className='link-primary'
          href='https://www.dm-webdev.ru/'
          rel='noreferrer noopener'
          target='_blank'
          color='textSecondary'
        >
          https://www.dm-webdev.ru
        </Link>
      </Typography>
    </div>
  );
}

export default withTitleUpdate(InfoPage, 'Информация');
