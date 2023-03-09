// Run `npm start` to start the demo
import { intro, outro, confirm, select, spinner, isCancel, cancel, text } from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";
import color from "picocolors";

async function main() {
  console.log();
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
  if (projectType === "RestAPI") {
    techType = await select({
      message: "Seleccione la tecnología.",
      options: [
        { value: "Laravel", label: "Laravel" },
        { value: "NestJS", label: "NestJS", hint: "en desarrollo" },
      ],
    });
  } else if (projectType === "Front") {
    techType = await select({
      message: "Seleccione la tecnología.",
      options: [
        { value: "React", label: "React" },
        { value: "Vue", label: "Vue" },
        { value: "Angular", label: "Angular", hint: "que ganas de sufrir que tenés xd" },
      ],
    });
  } else if (projectType === "Fullstack") {
    techType = await select({
      message: "Seleccione la tecnología.",
      options: [
        { value: "Laravel", label: "Laravel" },
        { value: "NextJS", label: "NextJS", hint: "ya quisieras xd" },
      ],
    });
  }

  if (isCancel(techType)) {
    cancel("Creación cancelada");
    return process.exit(0);
  }

  const spinnerInit = spinner();
  spinnerInit.start("Inicializando proyecto...");

  await sleep(3000);
  spinnerInit.stop();

  const spinnerClonado = spinner();
  spinnerClonado.start("Inicializando proyecto...");

  await sleep(3000);
  spinnerClonado.stop("Installed via npm");

  outro("Listo! 🎉" + color.dim(` (${name} creado con ${techType} para desarrollo ${projectType})`));

  await sleep(1000);
}

main().catch(console.error);
