const { camelCase } = require('change-case');
const handlebars = require('handlebars');
const path = require('path');
const {
  loadPostman,
  saveNewPostmanData,
  deleteOldRepoDirectory,
  openFile,
  createDirectory
} = require('./utility');

const getPostmanV1 = require('./get_postman_v1');
const getPostmanV2 = require('./get_postman_v2');

const {
  POSTMAN_LOCAL_PATH,
  OUT_PUT,
  REPOSITORY_URL
} = require('./constans');

// define global variables
let requestTemplateString;
let indexTemplateString;
let requestGroupTemplateString;
let requestTemplate;
let indexTemplate;
let requestGroupTemplate;
let isV1 = false;

// define handlebars helper function
handlebars.registerHelper('ifEquals', function (a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

handlebars.registerHelper('camelCase', (name) => camelCase(name));

// open package.json file
// const PACKAGE_JSON = JSON.parse(openFile(PACKAGE_JSON_PATH));

// get config from package.json -> postman
// const outputPath = PACKAGE_JSON.postman.target;

const start = async (postmanData) => {
  try {
    isV1 = !!postmanData?.folders;
    // open template files and store in globals
    requestTemplateString = await openFile(
      '/generate-postman/templates/request-template.hbs'
    );
    indexTemplateString = await openFile(
      '/generate-postman/templates/index-template.hbs'
    );
    requestGroupTemplateString = await openFile(
      '/generate-postman/templates/request-group-template.hbs'
    );

    // make template
    requestTemplate = await handlebars.compile(requestTemplateString);
    indexTemplate = await handlebars.compile(indexTemplateString);
    requestGroupTemplate = await handlebars.compile(requestGroupTemplateString);

    // cleaning old repository if exist
    await deleteOldRepoDirectory(OUT_PUT);

    // create new root directory for repository folder
    await createDirectory(OUT_PUT);

    if (isV1) {
      console.log('####################################');
      console.log('#####                          #####');
      console.log('#####---->    going V1    <----#####');
      console.log('#####                          #####');
      console.log('####################################\n\n');

      await getPostmanV1({
        indexTemplate,
        outputPath: OUT_PUT,
        postmanData,
        requestGroupTemplate,
        requestTemplate
      });
    } else {
      console.log('####################################');
      console.log('#####                          #####');
      console.log('#####---->    going V2    <----#####');
      console.log('#####                          #####');
      console.log('####################################\n\n');

      await getPostmanV2({
        indexTemplate,
        outputPath: OUT_PUT,
        postmanData: postmanData.item,
        requestGroupTemplate,
        requestTemplate
      });
    }
  } catch (e) {
    console.log('start -> catch -> ', e);
  }
};

loadPostman(REPOSITORY_URL)
  .then((newPostmanData) => {
    // start after response
    start(newPostmanData);
    saveNewPostmanData(newPostmanData);
  })
  .catch((e) => {
    console.log('\n\n ##-> start => get postman failed');
    console.log('##-> start => e -> ', e);
    console.log('\n\n ##-> start postman from local');
    // open local postman async
    try {
      openFile(POSTMAN_LOCAL_PATH)
        .then((data) => {
          start(JSON.parse(data));
        });
    } catch (err) {
      console.log('##-> start postman from local was error => e -> ', err);
    }
  });
