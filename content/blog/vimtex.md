+++
title = "Raycast, Vim & LaTeX"
slug = "vimtex-notes"
description = ""
date = 2023-02-21
+++

Upon reading Gilles Castel's various [posts](https://castel.dev/) on his
workflow with Vim and LaTeX, I was inspired to try it out myself.
Trouble is, I'm not using Linux on my MacBook, so I can't run Rofi and
Polybar. In my last post I briefly talked about Raycast and its use case
for toggling applications, but I thought, could I create a workflow
similar to Gilles?

Although I don't make notes with LaTeX, I do have experience using it
for writing papers, reports and equations in Obsidian. I've also found
the use of Inkscape a little clunky for my liking, so I've not written
anything for importing diagrams drawn in Inkscape, but I'm sure it
shouldn't be too hard to implement Gilles' approach. 

## A little introduction to Raycast
Raycast enables you to create custom scripts that can be run from the
Raycast search bar. Documentation on how to create custom scripts can be 
found [here](https://github.com/raycast/script-commands). Scripts can be
written in Bash, JavaScript, Python, PHP, Ruby, Swift and AppleScript.
I'm most familiar with Bash and Python so those will be my weapons of 
choice for this. 

You can directly give the script an input within the Raycast search bar,
and also display the output of the script inside the search bar or in an
overlaying HUD. Everything all about output modes can be found
[here](https://github.com/raycast/script-commands/blob/master/documentation/OUTPUTMODES.md).


## File Structure
My university course is comprised of various modules. To swap between
different modules I'm going to use Gilles'
[approach](https://castel.dev/post/lecture-notes-3/#keeping-track-of-the-current-course),
of creating a symlink to a specified module. Here is an example of what
a 'LaTeX' file may look like:


```bash
.
├── ALA
│   ├── figures
│   │   └── figure_20230208172514.png
│   ├── info.yaml
│   ├── les_01.tex
│   ├── les_02.tex
│   ├── lib.bib
│   └── master.tex
├── DS
│   ├── figures
│   ├── info.yaml
│   ├── les_01.tex
│   ├── les_02.tex
│   ├── les_03.tex
│   ├── lib.bib
│   ├── master.pdf
│   └── master.tex
├── EMAT
│   ├── figures
│   ├── info.yaml
│   ├── lib.bib
│   ├── master.tex
├── current-module -> DS
└── preamble.tex
```
