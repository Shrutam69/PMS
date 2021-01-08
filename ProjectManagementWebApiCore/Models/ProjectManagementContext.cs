using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProjectManagementWebApiCore.Models
{
    public partial class ProjectManagementContext : DbContext
    {
        public ProjectManagementContext()
        {
        }

        public ProjectManagementContext(DbContextOptions<ProjectManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAssign> TblAssign { get; set; }
        public virtual DbSet<TblEmployee> TblEmployee { get; set; }
        public virtual DbSet<TblEmployeeSkill> TblEmployeeSkill { get; set; }
        public virtual DbSet<TblProject> TblProject { get; set; }
        public virtual DbSet<TblProjectTech> TblProjectTech { get; set; }
        public virtual DbSet<TblSkillsMaster> TblSkillsMaster { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=PCA196\\SQL2014;Database=ProjectManagement;User ID=sa;Password=shrutatva123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblAssign>(entity =>
            {
                entity.ToTable("tblAssign");
            });

            modelBuilder.Entity<TblEmployee>(entity =>
            {
                entity.ToTable("tblEmployee");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(25);

                entity.Property(e => e.ReleaseDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");
            });

            modelBuilder.Entity<TblEmployeeSkill>(entity =>
            {
                entity.ToTable("tblEmployeeSkill");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TblEmployeeSkillEmployee)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__tblEmploy__Emplo__182C9B23");

                entity.HasOne(d => d.Skill)
                    .WithMany(p => p.TblEmployeeSkillSkill)
                    .HasForeignKey(d => d.SkillId)
                    .HasConstraintName("FK__tblEmploy__Skill__1920BF5C");
            });

            modelBuilder.Entity<TblProject>(entity =>
            {
                entity.ToTable("tblProject");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(25);

                entity.Property(e => e.StartDate).HasColumnType("date");
            });

            modelBuilder.Entity<TblProjectTech>(entity =>
            {
                entity.ToTable("tblProjectTech");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TblProjectTechEmployee)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__tblProjec__Emplo__1BFD2C07");

                entity.HasOne(d => d.Skill)
                    .WithMany(p => p.TblProjectTechSkill)
                    .HasForeignKey(d => d.SkillId)
                    .HasConstraintName("FK__tblProjec__Skill__1CF15040");
            });

            modelBuilder.Entity<TblSkillsMaster>(entity =>
            {
                entity.ToTable("tblSkillsMaster");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
