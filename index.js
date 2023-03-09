// Run `npm start` to start the demo
import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
} from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";
import color from "picocolors";
import shell from "shelljs";
const path = process.cwd().substring(0, process.cwd().lastIndexOf("\\"));

const projects = {
  Laravel: "template-laravel-modernizacion",
  React: "template-reactjs-modernizacion",
  ReactVite: "template-reactjs-modernizacion",
};

const urls = {
  Laravel:
    "https://github.com/NQNModernizacion/template-laravel-modernizacion.git",
  React:
    "https://github.com/NQNModernizacion/template-reactjs-modernizacion.git",
  ReactVite:
    "-b vite https://github.com/NQNModernizacion/template-reactjs-modernizacion.git",
};

async function main() {
  console.log(path);
  intro(color.inverse(" Creación de nuevo proyecto "));

  const name = await text({
    message: "¿Nombre del proyecto?",
    placeholder: "nombreDelProyecto",
  });

  if (isCancel(name)) {
    cancel("Creación cancelada");
    return process.exit(0);
  }

  //   const shouldContinue = await confirm({
  //     message: "Do you want to continue?",
  //   });

  //   if (isCancel(shouldContinue)) {
  //     cancel("Creación cancelada");
  //     return process.exit(0);
  //   }

  const projectType = await select({
    message: "Seleccione el tipo de proyecto.",
    options: [
      { value: "RestAPI", label: "API" },
      { value: "Front", label: "Frontend" },
      { value: "Fullstack", label: "Laravel" },
    ],
  });

  if (isCancel(projectType)) {
    cancel("Creación cancelada");
    return process.exit(0);
  }

  let techType = "";
  switch (projectType) {
    case "RestAPI":
      techType = await select({
        message: "Seleccione la tecnología.",
        options: [
          { value: "Laravel", label: "Laravel" },
          // { value: "NestJS", label: "NestJS", hint: "en desarrollo" },
        ],
      });
      break;
    case "Front":
      techType = await select({
        message: "Seleccione la tecnología.",
        options: [
          { value: "React", label: "React w/ CRA" },
          { value: "ReactVite", label: "React w/ Vite" },
          // { value: "Vue", label: "Vue" },
          // {
          //   value: "Angular",
          //   label: "Angular",
          //   hint: "que ganas de sufrir que tenés xd",
          // },
        ],
      });
      break;
    case "Fullstack":
      techType = await select({
        message: "Seleccione la tecnología.",
        options: [
          { value: "Laravel", label: "Laravel" },
          // { value: "NextJS", label: "NextJS", hint: "ya quisieras xd" },
        ],
      });
      break;
  }
  // if (projectType === "RestAPI") {
  // } else if (projectType === "Front") {
  // } else if (projectType === "Fullstack") {
  // }

  if (isCancel(techType)) {
    cancel("Creación cancelada");
    return process.exit(0);
  }

  const spinnerClonado = spinner();
  spinnerClonado.start("Clonando template...");

  shell.cd(path);
  shell.exec(`git clone ${urls[techType]}`);
  await sleep(10000);
  spinnerClonado.stop("Clonado!");

  shell.exec(`ren ${projects[`${techType}`]} ${name}`);

  const spinnerInit = spinner();
  spinnerInit.start("Inicializando proyecto...");

  shell.cd(name);
  shell.exec(`rd /s /q .git -h -y`);
  shell.exec("code .");
  await sleep(3000);
  spinnerInit.stop();

  outro(
    "Listo! 🎉" +
      color.dim(
        ` (${name} creado con ${techType} para desarrollo ${projectType})`
      )
  );

  await sleep(1000);
}

main().catch(console.error);
