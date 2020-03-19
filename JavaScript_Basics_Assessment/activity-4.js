const studentnames = ["James", "Samuel", "Johnathan"];
for (i = 0; i < 3; i++) {
  let names = prompt(`Enter person number ${i + 1}'s name: `);
  studentnames.push(names);
}
for (i = 0; i < studentnames.length; i++) {
  console.log(studentnames[i]);
}
